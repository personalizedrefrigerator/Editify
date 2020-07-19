"use strict";


function main()
{
    if (!window.SubWindowHelper)
    {
        alert("Failed to load LibJS.");
    }

    self.browser = browser || (SubWindowHelper.alert("Unable to access browser entity!"));

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
        }
        catch(e)
        {
            SubWindowHelper.alert("Error!", e + "");
        }
    });
}

// Call main (hopefully) after LibJS has loaded.
requestAnimationFrame(main);
