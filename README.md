# Social Media Engagement Analytics Module

This project is an AI-powered social media analytics module that uses **Langflow** and **DataStax Astra DB** to analyze engagement data from social media accounts. It processes data related to different post types (e.g., carousel, reels, static images) and calculates engagement metrics like likes, shares, and comments. The system leverages **Langflow** for workflow management and **GPT integration** for generating actionable insights based on the data.

## About

This AI-driven application helps social media managers and content creators quickly analyze post engagement data and derive meaningful insights. By leveraging the power of **DataStax Astra DB** for data storage and **Langflow** for workflow automation, the system calculates key performance indicators (KPIs) for different post types, and generates insights using **GPT** to improve content strategies.

## Features

- **Data Storage**: Store engagement data like likes, shares, and comments in **DataStax Astra DB**.
- **Post Type Analysis**: Calculate average engagement for different post types (carousel, reels, static images).
- **Insights Generation**: Use GPT to generate actionable insights based on the analyzed data, such as:
  - Carousel posts generate 20% higher engagement than static posts.
  - Reels drive 2x more comments compared to other formats.
- **Automated Workflow**: Automatically query the database and compute performance metrics using **Langflow**.


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DhruvVara/SocialMediaEngagementAnalytics

2. **Install the dependencies**:
    ```bash
    npm i

3. **Add the token and langflow URL in the .env file**

4. **Start the server**:
    ```bash 
    npm start


## Challenges

- **Data Integration**: Integrating Langflow with DataStax Astra DB required a seamless data flow setup to ensure the queries returned the right results..
- **GPT Integration**: Fine-tuning GPT prompts to generate relevant insights based on the queried data was a key challenge. Ensuring accurate and meaningful summaries was critical for the application’s effectiveness.
- **Real-time Interaction**:  Ensuring that the system processes and displays insights in real-time was important for a seamless user experience.
