export const fetchState = name =>
{
	try 
	{
		const str =  localStorage.getItem(name);
		if (str === null) return undefined;
		return JSON.parse(str);
	}
	catch (err) {return undefined;}
};

export const saveState = (name, json) =>
{
	try  {localStorage.setItem(name, JSON.stringify(json));}
	catch (err) {console.log(err);}
};
