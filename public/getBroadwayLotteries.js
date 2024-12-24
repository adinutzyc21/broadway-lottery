const getBroadwayDirectLotteries = () => {
    const lotteryList = [];

    document
        .querySelectorAll("div.one-third.column:not(.footer-right)")
        .forEach((el, id) => {
            if (el) {
                const img = el.querySelector(
                    "img.attachment-dlslot-show-homepage.size-dlslot-show-homepage"
                ).src;
                const url = el.querySelector("a").href || "";
                const price = el.querySelector("span.price").innerText;
                const name = el.querySelector("h4").innerText || "";
                lotteryList.push({ id, img, url, price, name });
            }
        });

    chrome.storage.sync.set({ lotteries: lotteryList });

    window.close();

    return true;
};

getBroadwayDirectLotteries();
