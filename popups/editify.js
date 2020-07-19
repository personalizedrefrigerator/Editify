"use strict";

function main()
{
    if (!window.SubWindowHelper)
    {
        alert("Failed to load LibJS.");
    }

    SubWindowHelper.alert();
}

// Call main (hopefully) after LibJS has loaded.
requestAnimationFrame(main);
