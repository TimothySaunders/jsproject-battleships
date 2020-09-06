const baseURL = "http://localhost:3000/api/game/";

export default {
        getGame(){
            return fetch(baseURL)
            .then(res => res.json());
        },
        getAGameById(id){
            return fetch(baseURL+id)
            .then(res => res.json())
        },
        addGame(payload){
            return fetch(baseURL, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json());
        },
        updateGame(id, payload) {
            return fetch(baseURL+id, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            .then(res => res.json());
        }
}