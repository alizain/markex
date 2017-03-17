# COMPONENTS

A list of components that the initial package of Markex supports. Components are contained in families that enable a certain set of processing. They are different from Markdown because they don't translate directly to HTML 1:1. Instead, they have more semantic meaning to the document. The key here is to capture structure AND content in the document; the two are inseparable. Style is a completely separate concern, and thus is kept separate. Almost all of layout is also a separate concern, and hence is not part of main document.


**Paragraph** *content*

The most important unit of content. One entire unit of though fleshed out. The simple paragraph is the starting point.


**List** *structure*

A set of collected/related thoughts. The way the list is presented - ordered, unordered, bulleted, dashed, etc is unimportant. This is true of ordered and unordered lists too. Even though the description implies some semantic context, in reality, unordered lists in a document have some deliberate order. Furthermore, the distinction does not make an actual difference to the structure of a document.


**Section** *structure*

The holy grail of hierarchical structure. Any idea, document, or collection of thoughts that has hierarchy can be adequately expressed with a series of nested `sections`. No need for `subsection` or any other idiotic division that makes no difference. The user should not be burdened with any additional devices to express hierarchy!


**Title** *structure & content*

This one is a bit tricky, but it should be present. No need to think about H1 or H2 or anything else. A section has a title. A section in a section has a subtitle, but we still call it a title.




## STYLE CREEP

There is a certain part of "style" that is actually integral to the meaning of content. That part is listed below. Essentially, these are modifiers of regular text.


**Bold**

Yup, pretty self explanatory


**Italics**

Duh!


**Underline**

Yaaayyy!


**Strikethrough**

Now it get's interesting...


**Subscript**

Wow! Seriously?


**Superscript**

Last one, I promise
