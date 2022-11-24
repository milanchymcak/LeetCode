/**
 * Copy the LeetCode problem to the clipboard
 * It includes:
 * Description
 * Examples
 * Constraints
 * Solution
 * All with GitHub markups, html tags converted
 */

/**
 * Replace html tags with github markups
 * @param s
 * @returns 
 */
 const Clean = (s) => {
    // Protect html
    s = s.replaceAll("<sup>", "**");
    s = s.replaceAll("<s/up>", "");

    // Clean
    s = s.replaceAll("<code>", "`");
    s = s.replaceAll("</code>", "`");
    s = s.replaceAll("<strong>", "**");
    s = s.replaceAll("</strong>", "**");
    s = s.replaceAll("&nbsp;", "   ");
    s = s.replace( /(<([^>]+)>)/ig, '');

    s = DecodeHtml(s);

    return s;
}

/**
 * Decode HTML Symbols
 * @param html
 * @returns 
 */
const DecodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * Title of the problem
 */
const DocumentTitle = document.querySelector("span.mr-2.text-lg.font-medium.text-label-1").textContent;

/**
 * Body Document
 */
const BodyDocument = document.querySelector('._1l1MA');
if(BodyDocument !== undefined && BodyDocument !== null) {

    /**
     * Description
     */
    let resultDescription = '';
    const documentParagraphs = BodyDocument.querySelectorAll("p, pre, img");
    for(const tag of documentParagraphs) {

        // Skip everything after we found example section
        if(tag.innerHTML.includes('class="example"')) break;
    
        // If Code
        if(tag.tagName === "PRE") {
            resultDescription += "\n```\n" + tag.innerHTML.replace( /(<([^>]+)>)/ig, '') + "\n```\n";
            continue;
        } 
        
        // Images
        if(tag.tagName === "IMG") {
            resultDescription += "![" + title + "](" + tag.getAttribute("src") + ")\n";
            continue;
        } 
        
        resultDescription += Clean(tag.innerHTML);
        resultDescription += "  \n";
    }

    /**
     * Examples
     */
     let resultExamples = "";
     let resultExamplesCount = 1;
     let exampleFound = false;
     const DocumentExamples = BodyDocument.querySelectorAll("p, pre, img");
     for(const tag of DocumentExamples) {

        // Must be example
        if(tag.innerHTML.includes('class="example"')) {
        exampleFound = true;
        }

        if(exampleFound === true) {

            // If Code
            if(tag.tagName === "PRE") {
                resultExamples += "\n```\n" + tag.innerHTML.replace( /(<([^>]+)>)/ig, '') + "\n```\n";
                if(tag.innerHTML.includes("<img src=")) {
                    var img = tag.querySelector("img");
                    resultExamples += "![" + title + "](" + img.getAttribute("src") + ")\n";
                }
                exampleFound = false;
                continue;
            } 
            
            // Images
            if (tag.tagName === "IMG") {
                resultExamples += "![" + title + "](" + tag.getAttribute("src") + ")\n";
                continue;
            }

            resultExamples += "#### Example " + resultExamplesCount + ":";
            resultExamples += "  \n";
            resultExamplesCount++;
        
        }
     }

    /**
     * Constraints
     */
    let resultConstraints = "";
    const DocumentConstraints = BodyDocument.querySelectorAll("ul li");
    for(const li of DocumentConstraints) {
        resultConstraints += "+ " + Clean(li.innerHTML);
        resultConstraints += "  \n";
    }
    if(resultConstraints.length > 5) {
        resultConstraints = "#### Constraints:  \n" + resultConstraints + "  \n";
    }

    /**
     * Lang Type
     */
    let resultLanguage = 'php';
    const DocumentLanguage = document.querySelector(".h-full.w-full[data-mode-id]");
    if(DocumentLanguage !== undefined && DocumentLanguage !== null) {
        const dataMode = DocumentLanguage.getAttribute("data-mode-id");
        if(dataMode === 'javascript') {
            resultLanguage = 'js';
        } 
        if(dataMode === 'mysql') {
            resultLanguage = 'sql';
        }
    }

    /**
     * Solution
     */
    let resultSolution = "";
    const DocumentSolutions = document.querySelector(".view-lines.monaco-mouse-cursor-text");
    for (const child of DocumentSolutions.children) {
        resultSolution += child.textContent + "  \n";
    }

    /**
     * Copy the result to the clipboard
     */
    copy("## 📝 " + DocumentTitle + "  \n" + resultDescription + "  \n" + resultExamples + "  \n" + resultConstraints + "## 📝 Solution \n```" + resultLanguage + "  \n" + resultSolution + "```  \n");
}