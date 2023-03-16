const getAllGames = async () => {
    try {
        const token = localStorage.getItem("token");

        const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame", {
            method: "GET",
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })

        const data = await result.json();

        return data;

    } catch (error) {
        console.error(error);
    }
}

export default getAllGames;