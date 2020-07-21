"use strict";

let mainCount = 0;
function main()
{
    if (!window.SubWindowHelper)
    {
        mainCount++;

        if (mainCount > 100)
        {
            alert("Failed to load LibJS.");
            return;
        }

        requestAnimationFrame(main);
        return;
    }

    self.browser = self.browser || (SubWindowHelper.alert("Unable to access browser entity!"));

    const confirmButton = document.querySelector("#Confirm");
    const cancelButton = document.querySelector("#Cancel");

    cancelButton.addEventListener("click", () =>
    {
        window.close();
    });

    confirmButton.addEventListener("click", async () =>
    {
        try
        {
            await browser.tabs.executeScript({file: "/content_scripts/LibJS.js"});
            await browser.tabs.executeScript({file: "/content_scripts/editify.js"});

            window.close();
        }
        catch(e)
        {
            SubWindowHelper.alert("Error!", e + "");
        }
    });

    confirmButton.focus();

    console.log("Loaded popup.");
}

// Call main (hopefully) after LibJS has loaded.
requestAnimationFrame(main);
