# Syntax

There are a couple parts of the Markex syntax:
- components
- variables
- include/extends
- looping
- conditionals


## COMPONENTS

Everything is essentially a component in Markex. All components have a longform, or `full` declaration. Some also have a `short` declaration.


**Things to Thing About**

- Namespaced components?
- To close or not to close?


**Definition**

[COMP_TYPE COMP_NAME .COMP_CLASS | OPTIONS or VARIABLES]

  *Header*

  [h] This is an H1 header

  [h | #] This is an H1 header

  # This is an H1 header

  This is an H1 header
  ================

  [h | ##] This is an H2 header

  ## This is an H2 header

  This is an H2 header
  ----------

  [h | ###] This is an H3 header

  ### This is an H3 header

  [h | ######] This is an H6 header

  ###### This is an H6 header


  *Bold Text*

  [bold] This text is bold

  ** This text is bold **


  *Italicized Text*

  [italic] This is italicized text

  * This text is italicized *


  *Underline Text*

  [uline] This text is underlined

  _ This text is underlined _


  *Images*

  [img | url='http://example.com/smile.png' alt='Smiley Face']
    or
  [img | url='http://example.com/smile.png'] Smiley Face
