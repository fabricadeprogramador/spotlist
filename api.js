/** 
 * É necessário gerar o client ID e client Secret da aplicação
 * Para isso, crie a sua conta, e a aplicação 
 * no dashboard spotify developer: https://developer.spotify.com/dashboard/
 **/
let clientID = ""; // Colocar seu Client ID
let clientSecret = ""; // Colocar seu Client Secret
let redirectUri = ""; // Colocar seu redirect_uri
let authorizationCode;
let user;
let refreshToken;

export async function setAuthorizationCode(code) {
  try {
    authorizationCode = code;
    await getUser();
  } catch (error) {
    console.log(error);
  }
}

async function getAccessToken() {
  try {
    let body = new URLSearchParams();

    if (!refreshToken) {
      body.append("grant_type", "authorization_code");
      body.append("code", authorizationCode);
      body.append("redirect_uri", redirectUri);
    } else {
      body.append("grant_type", "refresh_token");
      body.append("refresh_token", refreshToken);
    }

    let resposta = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
      },
      body: body,
    });
    let respostaCorpo = await resposta.json();
    if (respostaCorpo.refresh_token) refreshToken = respostaCorpo.refresh_token;
    return respostaCorpo.access_token;
  } catch (error) {
    console.log(error);
  }
}

async function getUser() {
  try {
    let token = await getAccessToken();
    let resposta = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    user = await resposta.json();
  } catch (error) {
    console.log("Erro ao buscar usuário: " + error);
  }
}

export async function getPlaylists() {
  try {
    let token = await getAccessToken();
    let resposta = await fetch(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    let respostaCorpo = await resposta.json();
    if(!respostaCorpo.error) return respostaCorpo.items;
    else throw respostaCorpo.error
  } catch (error) {
    throw { mensagem: "Erro ao buscar playlists do usuário" }
  }
}
