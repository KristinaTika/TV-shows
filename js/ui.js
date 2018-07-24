const uiModule = (() => {

    renderShows = (shows) => {
        const row = $(".row");
        for (let i = 0; i < shows.length; i++) {
            const showCard = $(`
            <a href="show-info.html" data-id="${shows[i].id}" class="col-4 landing-page-a"
                <div class="col-4">
                    <div class="item">
                        <img src="${shows[i].image}">
                            <p>${shows[i].name}</p>
                    </div>
                </div>
            </a>`);
            row.append(showCard);
        }

    }

    const renderError = (status) => {
        const row = $("row");
        const errorField = $(`<div class="col-8 offset-2">${status}</div>`)
        row.append(errorField);
    }

    const renderSingleShow = (show) => {

        const titleField = $(".title");
        const title = $(`<h1>${show.name}</h1>`);
        titleField.append(title);

        const imgField = $(".img");
        const img = $(`<img src=${show.image} alt="${show.name} image" class=" col-12 info-img"/>`);
        imgField.append(img);

        const seasonsList = $(".seasons-list");
        for (let i = 0; i < show.seasonsList.length; i++) {
            let liSeasonsItem = $(`<li class="col-6">${show.seasonsList[i].number}${show.seasonsList[i].premiereDate} - ${show.seasonsList[i].endDate}</li>`);
            seasonsList.append(liSeasonsItem);
        }

        const castField = $(".cast-list");
        for (let i = 0; i < show.castList.length; i++) {
            let castLi = $(`<li class="col-4">${show.castList[i]}</li>`);
            castField.append(castLi);
        }

        const showDetailsField = $(".show-details");
        const showDetails = $(`
        <h3>Show Summary</h3>
            <p>${show.summary}</p>`);
        showDetailsField.append(showDetails);
    }


    renderSearchSuggestions = (suggestedShows) => {

        let inputSearch = $(".search-list");
        inputSearch.empty();
        suggestedShows.forEach((show) => {
            const item = $(`<a href="show-info.html" data-id=${show.id}>${show.name}</a>`);
            inputSearch.append(item);
        })
    }

    return {
        renderShows,
        renderError,
        renderSingleShow,
        renderSearchSuggestions
    }

})();