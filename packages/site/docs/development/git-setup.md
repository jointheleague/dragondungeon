# Git Setup

1. Clone the git repository:

```bash
git clone https://github.com/jointheleague/dragondungeon.git
```

2. Install dependencies:

```bash
cd dragondungeon
yarn install
```

:::caution

Remember to use ```yarn``` instead of ```npm```.

:::

3. Run server:

```bash
yarn start # Start everything
yarn start:site # Run the info site only
yarn start:client # Run only the game client (requires manual JWT signing)
yarn start:server # Run the game server only
```