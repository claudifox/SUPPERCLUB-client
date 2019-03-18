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

  static create(user) {
    return fetch(baseUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static validate() {
    return this.get(baseUrl + "validate");
  }

  static getUserInfo() {
    return this.get(baseUrl + "user_info")
  }

  static getSuppers(user) {
    return this.get(baseUrl + `/users/${user.id}/suppers`);
  }

  static getBookings(user) {
    return this.get(baseUrl + `/users/${user.id}/bookings`);
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
