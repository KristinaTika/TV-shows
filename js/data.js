const dataModule = (() => {

    class Show {
        constructor(id, name, image) {
            this.id = id;
            this.name = name;
            this.image = image;
        }
    }

    class SingleShow extends Show {
        constructor(id, name, image, castList, seasonsList, summary) {
            super(id, name, image);
            this.castList = castList;
            this.seasonsList = seasonsList;
            this.summary = summary;
        }
    }

    const fetchShows = (successHandler, errorHandler) => {
        const request = $.ajax({
            url: `http://api.tvmaze.com/shows`,
            method: "GET"
        });
        request.done((responseData) => {
            const showList = [];

            for (let i = 0; i < 50; i++) {
                const id = responseData[i].id;
                const name = responseData[i].name;
                const image = responseData[i].image.medium;
                const show = new Show(id, name, image);
                showList.push(show);
            }

            successHandler(showList);
        });
        request.fail((jqXHR, textStatus) => {
            errorHandler(textStatus);
        });
    }

    const fetchSingleShow = (id, successHandler, errorHandler) => {
        const request = $.ajax({
            url: `http://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`,
            method: "GET"
        });
        request.done((responseData) => {

            const id = responseData.id;
            const name = responseData.name;
            const image = responseData.image.original;
            const summary = responseData.summary;
            const castList = [];
            const cast = responseData._embedded.cast;

            for (let i = 0; i < cast.length; i++) {
                castList.push(cast[i].person.name);
            }

            const seasonsList = [];
            const seasons = responseData._embedded.seasons;

            for (let i = 0; i < seasons.length; i++) {
                const number = seasons[i].number + ":  ";
                const premiereDate = seasons[i].premiereDate;
                const endDate = seasons[i].endDate;
                const seasonsObject = {
                    number,
                    premiereDate,
                    endDate
                }
                seasonsList.push(seasonsObject)
            }

            const singleShow = new SingleShow(id, name, image, castList, seasonsList, summary);

            successHandler(singleShow);
        })
        request.fail((jqXHR, textStatus) => {
            errorHandler(textStatus);
        });
    }


    const searchSuggestions = (input, successHandler, errorHandler) => {
        
        const request = $.ajax({
            url: `http://api.tvmaze.com/search/shows?q=${input}`,
            method: "GET"
        });
        request.done((responseData) => {

            const suggestedShowsList = [];

            for (let i =0; i < responseData.length; i++) {
                const showId = responseData[i].show.id;
                const showName = responseData[i].show.name;
                const showImage= "";
                const suggestedSingleShow = new Show (showId, showName, showImage);
                suggestedShowsList.push(suggestedSingleShow);
            }
            successHandler(suggestedShowsList);
        });
        request.fail((jqXHR, textStatus) => {
            errorHandler(textStatus)
        });
    }

    return {
        fetchShows,
        fetchSingleShow,
        searchSuggestions
    }

})();