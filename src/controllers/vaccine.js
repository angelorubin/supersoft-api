const Vaccine = require("src/models/vaccine");
const bookshelf = require("src/config/db");

exports.retrieveVaccines = async (req, res, next) => {
	try {
		const vaccines = await new Vaccine()
			.fetchPage({})
			.then(function (vaccines) {
				return vaccines;
			});

		res.json({
			vaccines,
		});
	} catch (error) {
		next(error);
	}
};

exports.create = async (req, res, next) => {
	bookshelf.transaction(async (trx) => {
		try {
			const {
				nomeVacina,
				nomeFabricante,
				paisOrigem,
				quantidadeMinimasDoses,
				percentualEficaciaComprovada,
				precoVendaPorDose,
			} = req.body.data;

			let data = {
				nome_vacina: nomeVacina,
				nome_fabricante: nomeFabricante,
				pais_origem: paisOrigem,
				quantidade_minimas_doses: quantidadeMinimasDoses,
				percentual_eficacia_comprovada: percentualEficaciaComprovada,
				preco_venda_por_dose: precoVendaPorDose,
			};

			return Vaccine.forge(data)
				.save(null, { transacting: trx })
				.then(() => {
					trx.commit;
					res.json({
						status: "ok",
						message: "A vacina foi cadastrada com sucesso",
					});
				})
				.catch((e) => {
					res.json({
						status: "error",
						message: "Ocorreu um erro, a vacina não foi cadastrada.",
					});
					trx.rollback;
				});
		} catch (error) {
			await trx.rollback;
			res.json({ status: "error", message: error });
		}
	});
};

exports.retrieveVaccineById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const vaccine = await new Vaccine({ id })
			.fetch()
			.then((vaccine) => vaccine);

		res.json({ vaccine });
	} catch (error) {
		res.json({ error });
	}
};

exports.update = async (req, res, next) => {
	try {
		const { id } = req.params;

		const vaccine = await Vaccine.where({ id })
			.save(req.body, { patch: true })
			.then((vaccine) => vaccine);

		res.json({ vaccine });
	} catch (error) {
		res.json({ error });
	}
};

exports.destroy = async (req, res, next) => {
	const { id } = req.params;

	try {
		await new Vaccine({ id }).destroy().then(function (result) {
			res.json({
				error: false,
				data: { message: "A vacina foi deletada com sucesso." },
			});
		});
	} catch (error) {
		res.json({ error: true, data: { message: error.message } });
	}
};
