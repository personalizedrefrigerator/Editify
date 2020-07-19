"use strict";

function main()
{
    if (!window.SubWindowHelper)
    {
        alert("Failed to load LibJS.");
    }

    const textareas = document.querySelectorAll("textarea");

    for (const textarea of textareas)
    {
        // Some editors contain a textarea and a stylized editor.
        // If there seems to be a stylized editor, disable it.
        const otherChildren = textarea.parentElement.children;

        for (const child of otherChildren)
        {
            const childClass = child.getAttribute("class");
            const childTag = child.tagName.toLowerCase();

            // If it looks like a text editor, destroy it.
            if (childClass.toLowerCase().search(/(code)|(ace)|(edit)/ig) !== -1
                    && childTag === "div")
            {
                child.outerHTML = "";
            }
        }

        // Now replace it.
        EditorHelper.replaceWithEditor(textarea,
        {
            height: 300
        });
    }

    SubWindowHelper.alert("Done!");
}

// Call main (hopefully) after LibJS has loaded.
requestAnimationFrame(main);
