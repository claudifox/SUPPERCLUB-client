const baseUrl = "http://localhost:3000/"


class API {
  static login(user) {
    return fetch(baseUrl +"login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static createUser(user) {
    return fetch(baseUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static createSupper(supper, user) {
    fetch(baseUrl + `users/${user.userId}/hosted_suppers`, {
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      body: JSON.stringify({
        name: supper.name,
        description: supper.description,
        picture: supper.picture,
        date: supper.date,
        time: supper.time,
        address: supper.selectedAddress,
        lat: supper.lat,
        lng: supper.lng,
      })
    })
    .then(response => response.json())
  }

  static validate() {
    return this.get(baseUrl + "validate");
  }

  static getUserInfo() {
    return this.get(baseUrl + "user_info")
  }

  static getAllSuppers() {
    return this.get(baseUrl + "suppers")
  }

  static getHostedSuppers(user) {
    return this.get(baseUrl + `/users/${user.userId}/hosted_suppers`);
  }

  static getAttendedSuppers(user) {
    return this.get(baseUrl + `/users/${user.userId}/attended_suppers`);
  }

  static get(url) {
    return fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json());
  }
}

window.API = API;

export default API;
