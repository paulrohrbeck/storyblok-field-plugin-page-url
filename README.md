# Page URL Field Plugin

A simple Storyblok field plugin that displays the current page's live URL based on the story's slug. This plugin helps users (especially non-technical ones) understand what URL their content will have when published.

## Features

- **Live URL Display**: Shows the complete URL based on the story's `full_slug`
- **Configurable Base URL**: Set your domain in the plugin configuration
- **Slug Processing**: Remove language prefixes (like "en/") using regex patterns
- **Trailing Slash Support**: Automatically adds trailing slashes to URLs
- **Published Page Access**: When a story is published, displays a clickable external link icon to open the page in a new tab

## How It Works

The plugin reads the story data from Storyblok and:

1. Extracts the `full_slug` from the current story
2. Applies a configurable regex pattern to remove unwanted prefixes (e.g., language codes)
3. Constructs the full URL using your configured base domain
4. Adds trailing slashes if enabled
5. Shows an external link icon for published stories that opens the live page

## Configuration

The plugin uses `field-plugin.config.json` for configuration:

```json
{
  "options": [
    {
      "name": "baseUrl",
      "value": "https://www.getflip.com"
    },
    {
      "name": "slugPattern",
      "value": "^en/"
    },
    {
      "name": "addTrailingSlash",
      "value": true
    }
  ]
}
```

- **`baseUrl`**: Your website's domain
- **`slugPattern`**: Regex pattern to remove from slugs (e.g., `"^en/"` removes "en/" from the beginning)
- **`addTrailingSlash`**: Whether to add trailing slashes to URLs (defaults to `true`)

## Usage

For development, run the application locally with

```shell
npm run dev
```

and open the [Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/).

To build the project, run

```shell
npm run build
```

Deploy the field plugin with the CLI. Issue a [personal access token](https://app.storyblok.com/#/me/account?tab=token), rename `.env.local.example` to `.env.example`, open the file, set the value `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and run

```shell
npm run deploy
```

## Example Output

For a story with slug `"en/products/shoes"`:

- **Processed slug**: `"products/shoes/"` (removes "en/" and adds trailing slash)
- **Final URL**: `"https://www.getflip.com/products/shoes/"`
- **Display**: Shows the URL with an external link icon if the story is published
