# Broadway Lottery Auto-enterer
Chrome extension that signs you up for all Broadway Lotteries.

## About

Inspired by peterzhen/BroadwayLottery which hasn't been updated in 2 years. Plan is to support more than just BroadwayDirect.

## Improvements over the original repo

- This repo uses React and MUI which is more maintainable.
- The extension opens a new tab in the background to https://lottery.broadwaydirect.com/ and gets a list of active lotteries from there instead of hardcoding them. Then it closes the tab.
- This extension adds a query parameter which means that it won't affect people just navigating to the sites.
- This extension supports multiple profiles and alllows the user to swich the favorite profile to use. You can apply with more than one profile then.
- Both the lotteries and the profiles are stored in Chrome storage.

## Use The Extension
1. Clone the repo and cd into the directory
2. Install and build the extension (this might take a while):
    - `npm install`
    - `npm run build`
        - this should create a `"build"` folder in the extension folder - this is the extension code that needs to be loaded into Chrome
3. Load extension into Chrome by going to `chrome://extensions/`, turning developer mode on, and clicking `Load unpacked`. Select the `build` folder. The extension will now be available in the extension toolbar.

## Notes

- `?bwayExt=true` in manifest.json was added because otherwise the extension just ran on broadwayDirect pages so users couldn't just open the site anymore.