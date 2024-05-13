const contactOperationDispatcher = {
  get: async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/pro_players/contacts",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  post: async  (data) => {
    try{
       await fetch("https://playground.4geeks.com/contact/agendas/pro_players/contacts",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    }
    catch (error) {
      console.error('error',error);
      throw error;
    }
},
delete: async (id) => {
  try{
    await fetch(`https://playground.4geeks.com/contact/agendas/pro_players/contacts/${id}`,{
      method: 'DELETE'}
    )
  }
  catch (error){
    console.error('error',error);
    throw error;
  }
}
}

export default contactOperationDispatcher;