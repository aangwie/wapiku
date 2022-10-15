const {Client} = require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL,	
	ssl:{
		rejectUnauthorized: false
	}
});

client.connect();

const readSession = async () => {
	try{
		const res = await client.query('SELECT * FROM wa-session ORDER BY create-at DESC LIMIT 1 ');
		if(res.rows.length) return res.rows[0].session;
		return '';
	}catch(err){
		throw err;

	}
} 

const saveSession = (session) => {
	client.query('INSERT INTO wa-session (session) VALUES($1)', [session], (err, results)=>{
		if(err){
			console.error('Failed to save session!', err);
		}else{
			console.log('Session saved!');
		}
	});
}

const removeSession = () => {
	client.query('DELETE FROM wa-session', (err, results)=>{
		if(err){
			console.error('Failed to save session!', err);
		}else{
			console.log('Session deleted!');
		}
	});
}

module.exports = {
	readSession,
	saveSession,
	removeSession
}