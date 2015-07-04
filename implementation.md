# Implementation

The core implementation is small and simple. It runs a number of passes over the source document to produce the final output. The passes are detailed below:

  1.  Parse

  The document gets parsed into a properly formed abstract syntax tree. Placeholders are extensively used in the document to denote the position at which some other sub-component needs to be inserted. This includes things like images, files, and other embedded items.

  2. Render

  This phase takes in the AST for the document, and calls the specific renderer function which returns something.

  In the current implementation, HTML is assumed to be the translation, or rendering layer. HTML is highly portable, easy to use, and has fairly consistent rendering behavior. Moreover, since this layer is part of the implementation (and is abstracted), a specific rendering engine can be targeted (Chromium using PhantomJS).

  The way this phase is architected, there is no constraint in implementing, for example, an iOS native translation, or any other, completely custom, rendering stack. In fact, because each component is rendered atomically, rendering stacks can be mixed and matched at runtime. The added benefit, is flexibility.

  The rendering implementation allows for any standard component renderer function to be swapped at runtime by a custom renderer. This provides the ability to build completely custom components for very specific use cases. Consistent flexibility is a key goal in the design of Markedup.

    !!! Thing to Note: How does the language/implementation ensure that functionality isn't duplicated and there remains a canonical way to do certain things.

  The renderer is inspired highly by React/WordPress. It gets passed in the object detailing the components's settings, and must return a renderable blob of code with a corresponding rendering engine. Each renderer must either be a function, or an object containing a `render` function.

  **Component Renderer Function**

  ```
  function bold (astObj) {
    return ('<bold>%s</bold', astObj.content);
  }
  ```
