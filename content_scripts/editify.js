"use strict";
(function()
{

function main()
{
    if (!window.SubWindowHelper)
    {
        alert("Failed to load LibJS.");
    }

    const textareas = document.querySelectorAll("textarea");

    for (const textarea of textareas)
    {
        if (typeof textarea !== "object" || !textarea.parentElement)
        {
            continue;
        }

        console.log("Considering textarea...");

        // Some editors contain a textarea and a stylized editor.
        // If there seems to be a stylized editor, disable it.
        const otherChildren = textarea.parentElement.children;

        for (const child of otherChildren)
        {
            if (typeof child !== "object" || !child.getAttribute)
            {
                continue;
            }

            const childClass = child.getAttribute("class") || child.getAttribute("id") || "";
            const childTag = child.tagName.toLowerCase();

            console.log(`Considering child ${childTag}.${childClass}`);

            // If it looks like a text editor, destroy it.
            if (childClass.toLowerCase().search(/(code)|(ace)|(edit)/ig) !== -1
                    && childTag === "div")
            {
                console.log(`Removing child of class, ${childClass}.`);
                child.style.display = "none";
                child.remove();
            }
        }
    }

    requestAnimationFrame(() =>
    {
        const textareas = document.querySelectorAll("textarea");

        for (const textarea of textareas)
        {
            if (typeof textarea !== "object" || !textarea.parentElement)
            {
                continue;
            }

            console.log("Re-considering textarea...");
            textarea.style = "display: block; opacity: 1; min-width: 100px; min-height: 100px;"

            // Now replace it.
            EditorHelper.replaceWithEditor(textarea,
            {
                height: 300
            });
        }

        SubWindowHelper.alert("Done!");
    });
}

// Call main (hopefully) after LibJS has loaded.
requestAnimationFrame(() =>
{
    try
    {
        main();
    }
    catch(e)
    {
        alert(e);
    }
});

})();
