// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
// Taken from Nat Tuck's lecture notes
import $ from "jquery";

function addBlack(game_id) {
    let text = JSON.stringify({
        game: {
            black_id: current_user_id
        },
    });

    $.ajax(game_path, {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text
    });
}

function join_click(ev) {
    let btn = $(ev.target);
    let game_id = btn.data('game-id');

    console.log(current_user_id);
    console.log(game_id);
    addBlack(game_id);
}

function init_join() {
    if (!$('.join-button')) {
        return;
    }

    $(".join-button").click(join_click);
}

$(init_join);
