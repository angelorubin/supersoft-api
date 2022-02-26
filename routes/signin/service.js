const db = require("config/db");
const bcrypt = require("bcrypt");

const getUsers = async () => {
	try {
		const users = await db.select("email").from("user");
		if (users.length > 0) {
			return users;
		} else {
			return { message: "Nenhum usuário cadastrado" };
		}
	} catch (error) {
		return error;
	}
};

const createUser = async (userData) => {
	const saltRounds = 10;
	const { email, password } = userData;

	try {
		bcrypt.hash(password, saltRounds, function (err, hash) {
			// Store hash in your password DB.
			db.transaction(function (trx) {
				db.insert({ email, password: hash })
					.into("user")
					.transacting(trx)
					.then(function (resp) {
						const id = resp[0];
						return { message: "Usuário criado com sucesso.", id, trx };
					})
					.then(trx.commit)
					.catch(trx.rollback);
			});
		});
	} catch (error) {
		return {
			message: "Ocorreu um erro ao criar o usuário e o usuário não foi criado.",
			error,
		};
	}
};

module.exports = {
	createUser,
	getUsers,
};
