# Broadway Lottery Auto-enterer
Chrome extension that signs you up for all Broadway Lotteries.

## About

Inspired by peterzhen/BroadwayLottery which hasn't been updated in 2 years. Plan is to support more than just BroadwayDirect.

## Use The Extension
1. Clone the repo and cd into the directory
2. Install and build the extension (this might take a while):
    - `npm install`
    - `npm run build`
        - this should create a `"build"` folder in the extension folder - this is the extension code that needs to be loaded into Chrome
3. Load extension into Chrome by going to `chrome://extensions/`, turning developer mode on, and clicking `Load unpacked`. Select the `build` folder. The extension will now be available in the extension toolbar.
