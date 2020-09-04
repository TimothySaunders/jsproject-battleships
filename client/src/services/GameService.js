const baseURL = "http://localhost:3000/api/game/";

export default {
        getGame(){
            return fetch(baseURL)
            .then(res => res.json());
        },
        // getAGameById(id){                //for LOAD a game? 
        //     return fetch(baseURL+id).then(res => res.json())
        // },

        addGame(payload){
            return fetch(baseURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(res => res.json());
        },
        updateGame(_id, payload) {
            return fetch(baseURL+id, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            .then(res => res.json());
        }


        




}