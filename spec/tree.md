# NODE TREE

This document defines the intermediate form of Markex - its Abstract Node Tree. The key here is to take the raw text document, and turn it into a state that can be worked on by other programs or processed further.

The format is assumed to be JSON, but there's no reason why the NT can't be represented in another transport language. In fact, the implementation is such that the data serializer can be chosen on the fly. So, for implementations of Markex in other languages, the NT can be represented as a binary blob, or anything else. The only assumption is that the data structure is as similar to the spec as possible (aside from language/efficiency considerations).

Hashed placeholders are used to denote the specific spot in which child/inline components should be inserted or rendered.

{
  "root" : {
    "name": "",
    "classes": [],
    "content": "",
    ""
  }

}
