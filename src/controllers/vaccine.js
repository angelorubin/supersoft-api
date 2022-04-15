const Vaccine = require("src/models/vaccine");
const bookshelf = require("src/config/db");

exports.index = async (req, res, next) => {
  try {
    res.json({
      message: "vaccine index",
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  bookshelf.transaction(async (trx) => {
    try {
      const {
        nome_vacina,
        nome_fabricante,
        pais_origem,
        quantidade_minimas_doses,
        percentual_eficacia_comprovada,
        preco_venda_por_dose,
      } = req.body;

      let data = {
        nome_vacina,
        nome_fabricante,
        pais_origem,
        quantidade_minimas_doses,
        percentual_eficacia_comprovada,
        preco_venda_por_dose,
      };

      return Vaccine.forge(data)
        .save(null, { transacting: trx })
        .then(() => {
          trx.commit;
          res.json({ message: "A vacina foi cadastrada com sucesso" });
        })
        .catch((e) => {
          trx.rollback;
          res.json({
            message: "Ocorreu um erro, a vacina não foi cadastrada.",
          });
        });
    } catch (error) {
      await trx.rollback;
      res.json({ error });
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

    const { nome_vacina } = req.body;

    const vaccine = await Vaccine.where({ id })
      .save({ nome_vacina }, { patch: true })
      .then((vaccine) => vaccine);

    res.json({ vaccine });
  } catch (error) {
    res.json({ error });
  }
};
