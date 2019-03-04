import Service from "@ember/service";
import $ from "jquery";

export default Service.extend({
  articles: null,
  state: null,
  isLoading: false,

  async init() {
    this._super(...arguments);
    const state = getNewState();
    this.set("state", state);
    this.set("isLoading", true);
    fetchArticles(state).then(articles => {
      this.set("articles", this.parse(articles));
      this.set("isLoading", false);
    });
  },

  parse(data) {
    if (!data || data.items.length == 0) {
      return [];
    }
    const articles = data.items;
    const parsedArticles = [];
    const link = "https://chroniclingamerica.loc.gov";
    for (let i = 0; i < 10; i++) {
      var article = articles[i];
      parsedArticles.push({
        name: article.title,
        link: `${link + article.id}`,
        publisher: article.publisher,
        year: article.start_year
      });
    }
    return parsedArticles;
  },

  async getNewArticles() {
    const state = getNewState();
    this.set("state", state);
    this.set("isLoading", true);
    fetchArticles(state).then(articles => {
      this.set("articles", this.parse(articles));
      this.set("isLoading", false);
    });
  }
});

async function fetchArticles(state) {
  const newState = state.includes(" ") ? state.split(" ").join("+") : state;
  const url = `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${newState}&format=json&page=1`;
  const articles = $.getJSON(url)
    .done(() => {
      console.log("success");
    })
    .fail(() => {
      console.log("error");
    });
  return articles;
}

function getNewState() {
  const newState = states[getRandomInt(50)];
  return newState.name;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const states = [
  {
    name: "Alabama",
    abbreviation: "AL"
  },
  {
    name: "Alaska",
    abbreviation: "AK"
  },
  {
    name: "Arizona",
    abbreviation: "AZ"
  },
  {
    name: "Arkansas",
    abbreviation: "AR"
  },
  {
    name: "California",
    abbreviation: "CA"
  },
  {
    name: "Colorado",
    abbreviation: "CO"
  },
  {
    name: "Connecticut",
    abbreviation: "CT"
  },
  {
    name: "Delaware",
    abbreviation: "DE"
  },
  {
    name: "Florida",
    abbreviation: "FL"
  },
  {
    name: "Georgia",
    abbreviation: "GA"
  },
  {
    name: "Hawaii",
    abbreviation: "HI"
  },
  {
    name: "Idaho",
    abbreviation: "ID"
  },
  {
    name: "Illinois",
    abbreviation: "IL"
  },
  {
    name: "Indiana",
    abbreviation: "IN"
  },
  {
    name: "Iowa",
    abbreviation: "IA"
  },
  {
    name: "Kansas",
    abbreviation: "KS"
  },
  {
    name: "Kentucky",
    abbreviation: "KY"
  },
  {
    name: "Louisiana",
    abbreviation: "LA"
  },
  {
    name: "Maine",
    abbreviation: "ME"
  },
  {
    name: "Maryland",
    abbreviation: "MD"
  },
  {
    name: "Massachusetts",
    abbreviation: "MA"
  },
  {
    name: "Michigan",
    abbreviation: "MI"
  },
  {
    name: "Minnesota",
    abbreviation: "MN"
  },
  {
    name: "Mississippi",
    abbreviation: "MS"
  },
  {
    name: "Missouri",
    abbreviation: "MO"
  },
  {
    name: "Montana",
    abbreviation: "MT"
  },
  {
    name: "Nebraska",
    abbreviation: "NE"
  },
  {
    name: "Nevada",
    abbreviation: "NV"
  },
  {
    name: "New Hampshire",
    abbreviation: "NH"
  },
  {
    name: "New Jersey",
    abbreviation: "NJ"
  },
  {
    name: "New Mexico",
    abbreviation: "NM"
  },
  {
    name: "New York",
    abbreviation: "NY"
  },
  {
    name: "North Carolina",
    abbreviation: "NC"
  },
  {
    name: "North Dakota",
    abbreviation: "ND"
  },
  {
    name: "Ohio",
    abbreviation: "OH"
  },
  {
    name: "Oklahoma",
    abbreviation: "OK"
  },
  {
    name: "Oregon",
    abbreviation: "OR"
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA"
  },
  {
    name: "Rhode Island",
    abbreviation: "RI"
  },
  {
    name: "South Carolina",
    abbreviation: "SC"
  },
  {
    name: "South Dakota",
    abbreviation: "SD"
  },
  {
    name: "Tennessee",
    abbreviation: "TN"
  },
  {
    name: "Texas",
    abbreviation: "TX"
  },
  {
    name: "Utah",
    abbreviation: "UT"
  },
  {
    name: "Vermont",
    abbreviation: "VT"
  },
  {
    name: "Virginia",
    abbreviation: "VA"
  },
  {
    name: "Washington",
    abbreviation: "WA"
  },
  {
    name: "West Virginia",
    abbreviation: "WV"
  },
  {
    name: "Wisconsin",
    abbreviation: "WI"
  },
  {
    name: "Wyoming",
    abbreviation: "WY"
  }
];
