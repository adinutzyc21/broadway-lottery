var mainProfileIndex = 0;
var profile = [];

chrome.storage.sync.get("mainProfileIndex", (storage) => {
    mainProfileIndex = storage.mainProfileIndex || mainProfileIndex;
});

chrome.storage.sync.get("profiles", (storage) => {
    profile = storage.profiles[mainProfileIndex];
});

const clickOpenShow = () => {
    try {
        const openButtons = document.getElementsByClassName("enter-button");
        if (openButtons.length === 0) {
            chrome.runtime.sendMessage({ closeThis: true });
        }

        for (let i = 0; i < openButtons.length / 2; i++) {
            //first half or second half, they repeat for tablets or desktop
            setTimeout(() => {
                console.log("Applying to: ", openButtons[i].innerText);
                openButtons[i].click();

                setTimeout(() => fillForm(profile), 500);
            }, i * 1000);
        }

        setTimeout(() => {
            chrome.runtime.sendMessage({ closeThis: true });
        }, (openButtons.length / 2) * 1510);
    } catch (e) {
        console.log("Error occurred", e);
    }
};

const fillForm = (profile) => {
    if (profile) {
        const iframe =
            document.getElementsByClassName("fancybox-iframe")[0].contentWindow
                .document;
        if (!iframe) {
            return;
        }

        const firstName = iframe.getElementById("dlslot_name_first");
        const lastName = iframe.getElementById("dlslot_name_last");
        const ticketQty = iframe.getElementById("dlslot_ticket_qty");
        const email = iframe.getElementById("dlslot_email");
        const month = iframe.getElementById("dlslot_dob_month");
        const day = iframe.getElementById("dlslot_dob_day");
        const year = iframe.getElementById("dlslot_dob_year");
        const zip = iframe.getElementById("dlslot_zip");
        const country = iframe.getElementById("dlslot_country");
        const tos = iframe.getElementById("dlslot_agree");

        const submit = iframe.querySelectorAll("input[value=Enter]")[0];

        try {
            const birthDate = new Date(profile.birthDate);

            firstName.value = profile.firstName;
            lastName.value = profile.lastName;
            ticketQty.options.selectedIndex = profile.ticketQty;
            email.value = profile.email;
            month.value = ("0" + (birthDate.getMonth() + 1)).slice(-2);
            day.value = ("0" + birthDate.getDate()).slice(-2);
            year.value = birthDate.getFullYear();
            zip.value = profile.zip;
            country.options.selectedIndex = Array.from(
                country.options
            ).findIndex((x) => x.innerHTML === profile.country);
            tos.checked = true;

            submit.click();

            setTimeout(() => {
                const close = document.querySelectorAll("a[title=Close]")[0];
                if (close) {
                    close.click();
                }
            }, 50);
        } catch (e) {
            console.log("Form not available:", e.toString());
        }
    }
};

clickOpenShow();
