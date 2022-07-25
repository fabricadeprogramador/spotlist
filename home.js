import { setAuthorizationCode, getPlaylists } from "./api.js";

async function carregarPlaylists() {
  let playlistSection = document.querySelector(".playlists");

  // 1 - pegar código de autorização
  let params = new URLSearchParams(location.search);
  let codAutorizacao = params.get("code");

  // 2 - passar código de autorização para o módulo api.js
  await setAuthorizationCode(codAutorizacao);

  // 4 - buscar as playlists do usuário
  try {
    let playlists = await getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      let capaPlaylist = playlists[i].images[0];
      playlistSection.innerHTML += `
        <div class="playlist-card">
            <img src="${
              capaPlaylist
                ? capaPlaylist.url
                : "https://horizondatasys.com/wp-content/uploads/2018/01/Dark-Gray-Square.png"
            }">
            <span>${playlists[i].name}</span>
        </div>
        `;
    }
  } catch (error) {
      console.log(error)
      playlistSection.innerHTML = error.mensagem
  }

  // 5 - listagem das playlists no HTML
}

document.body.onload = carregarPlaylists();
