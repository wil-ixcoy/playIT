const joi = require("joi");

let id = joi.number().integer();
let userId = joi.number().integer();
/* campos requeridos al crear la cuenta */
let name = joi.string().min(3).max(30);
let last_name = joi.string().min(3).max(30);
let username = joi.string().min(3).max(20);
let email = joi.string().email();
let years_experiencie = joi.number().integer();
let job_availability = joi.array().items(joi.string());
let date_of_birth = joi.date();
let technologies = joi.array().items(joi.string());
let country = joi.string();
let password = joi.string().min(8).max(30);

/* campos que se pueden llenar despues */
let company = joi.string();

/*  social, no requeridos al crear la cuenta*/
let about = joi.string().min(25).max(200);
let description = joi.string().min(40).max(800);
let web_page = joi.string();
let youtube_channel = joi.string();
let twitch_channel = joi.string();
let discord_channel = joi.string();
let linkedin_profile = joi.string();
let github_profile = joi.string();
let instagram_profile = joi.string();
let facebook_profile = joi.string();
let twitter_profile = joi.string();
let tiktok_profile = joi.string();

const createDeveloperSchema = joi.object({
  name: name.required(),
  last_name: last_name.required(),
  username: username.required(),
  email: email.required(),
  years_experiencie: years_experiencie.required(),
  job_availability: job_availability.required(),
  date_of_birth: date_of_birth.required(),
  technologies: technologies.required(),
  country: country.required(),
  password: password.required(),
});

const updateDeveloperProfileSchema = joi.object({
  email: email.required(),
  years_experiencie: years_experiencie.required(),
  job_availability: job_availability.required(),
  date_of_birth: date_of_birth.required(),
  technologies: technologies.required(),
  userId: userId.required(),
});

const getDeveloperSchema = joi.object({
  id: id.required(),
});

const updateDeveloperSchema = joi.object({
  name: name,
  last_name: last_name,
  username: username,
  years_experiencie: years_experiencie,
  job_availability: job_availability,
  date_of_birth: date_of_birth,
  technologies: technologies,
  country: country,
  about: about,
  description: description,
  web_page: web_page,
  youtube_channel: youtube_channel,
  twitch_channel: twitch_channel,
  discord_channel: discord_channel,
  linkedin_profile: linkedin_profile,
  github_profile: github_profile,
  instagram_profile: instagram_profile,
  facebook_profile: facebook_profile,
  twitter_profile: twitter_profile,
  tiktok_profile: tiktok_profile,
});

module.exports = {
  createDeveloperSchema,
  getDeveloperSchema,
  updateDeveloperSchema,
  updateDeveloperProfileSchema,
};
