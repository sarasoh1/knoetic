## Running locally

Oh my it runs! here!
https://knoetic-5dvo950ul-saras-projects-0bfbf543.vercel.app/

First, run the project:

``` bash
npx prisma generate
npx prisma studio
```
Run the generate command to generate the models used in the project. Open [http://localhost:5555](http://localhost:/5555) to view the database

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack used
For this project, I used a whole bunch of tools:
- For a quick database / ORM provider, I used [**Prisma**](https://www.prisma.io/docs)
- For component styling, I used [**ShadCN**](https://ui.shadcn.com/themes)
- For OAuth / authentication needs, I used [**Kinde**](https://docs.kinde.com/)

These tools were able to help me get set up relatively quickly to start working on the requirements of the challenge.

## Project Structure
Main folders that matter:
- *components*
  - This houses all the components that perform majority of the functionalities that are detailed in the requirements.
- *post*
  - Belongs to the `Post` data model that will be elaborated down below
- *forum*
  - Belongs to the `Forum` data model that will be elaborated down below
- *actions.ts*
  - Performs the `CREATE, UPDATE, DELETE` operations on the data model

## Assumptions & Data Models
It's my first time using an ORM tool, so I'm not too familiar with how to use it the most efficiently. My priority was to have something functional quick given that I didn't know a lot of things (like Typescript... and basically the whole entirety of frontend / full stack programming LOL)

1. Assumes that `Forum` model allows for only 1 admin
2. Assumes that each post has to be within a forum
3. Editing / updating posts will only allow you to edit the content body and not the title
4. Each user is entitled to **1 like per post**. Clicking on the Like button again will unlike the post.
5. Post only takes in `string` data type

### On delete
Assumes that on delete changes are cascade down to related classes.
- `Forum`: Deletes
  - Deletes the corresponding posts in the forum
- `Post`: Deletes
  - Deletes the `Likes` and `Comments` table
