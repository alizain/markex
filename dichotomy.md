# The Data vs Document Dichotomy

The key idea is that everything should be compilable down to a single "right" specification. Basically, people should be able to do stupid things with it, but the compiler can come in, and compile everything into a standardized format, much like gofmt.

Also, the format can be data-driven or content-driven, where DML and Markex go hand in hand.

If the document is data-driven, it is defined as the TOML/YAML based DML, where anything inside """ is actually compiled to Markex()

Markex has the following extensions:

.aa for documents in AST form
.ac for content-driven documents
.ad for data-driven documents

```markex.data

title = "Rumi"
body = """

Jalāl ad-Dīn Muhammad Rūmī and more popularly as {title}

"""

```

If the document is content-driven, it is defined as Markex where

```markex.document

```

Everything is basically a node. Can we make it really easy to write a document, as a data structure? So basically, the love-child of Markdown and YAML. Everything then gets rendered by React, because everything is just a component, once you compile it to React compatible syntax

The question remains, should data and the document be separate?

Let's take an example from Wikipedia:

```markex
--- yaml
title: Rumi
---

Jalāl ad-Dīn Muhammad Rūmī and more popularly as {title}

# Major Works

## Poetic Works

Rumi's poetry is often divided into various categories: the quatrains (rubayāt) and odes (ghazal) of the Divan, the six books of the Masnavi. The prose works are divided into The Discourses, The Letters, and the Seven Sermons.

-   {title}'s major work is the Maṭnawīye Ma'nawī (Spiritual Couplets; مثنوی معنوی), a six-volume poem regarded by some Sufis[52] as the Persian-language Qur'an. It is considered by many to be one of the greatest works of mystical poetry.[53] It contains approximately 27,000 lines of Persian poetry.[54]
Further information: Masnavi

-   Rumi's other major work is the Dīwān-e Kabīr (Great Work) or Dīwān-e Shams-e Tabrīzī (The Works of Shams of Tabriz; دیوان شمس تبریزی), named in honour of Rumi's master Shams. Besides approximately 35000 Persian couplets and 2000 Persian quatrains,[55] the Divan contains 90 Ghazals and 19 quatrains in Arabic,[56] a couple of dozen or so couplets in Turkish (mainly macaronic poems of mixed Persian and Turkish)[57][58] and 14 couplets in Greek (all of them in three macaronic poems of Greek-Persian).[59][60][61]

  Further information: Diwan-e Shams-e Tabrizi

```

So yes, definitely there should be a dichotomy between data and content. The main differences are that data can be easily queried by the current node and by all other nodes that reference this data.

Content can not be queried because it is not really a dictionary, but easily written code, which can then be transpiled to any language, where React/JSX/JS is ONE of those targets!

Also, with Markex, we do away with the concept of H1... H6, inseatd we treat # as Sections, with a forced title. Using a ### below a # implies that the ### is a subsection of #, giving us a proper nested tree, instead of a flat, useless list in Markdown

So the document above is actually short-form for the full language:

```AST
<Text>Jalāl ad-Dīn Muhammad Rūmī and more popularly as <Place self.title /></Text>
<Section title="Major Works">
  <Section>
  </Section>
</Section>
```

```AST

```

The specification of the full language, mainly the characters used to delineate the start and end of a BLOCK, are determined by characters least used in regular writing, so the writer has to do the least amount of escaping. It seems like this is going to be the good old XML spec.

You can write the full syntax inside the short-form syntax for anything!

You should not be able to embded HTML inside Markdup, like you do in Markdown. HTML is more imperative in nature, we're trying to stay more declarative.

Each BLOCK, let it be a section or text, defines a begin sequence and an end sequence. For example, for SECTION blocks, the begin sequence is "#". Technically, we will say that the end sequence is "/#", but end sequences can be completely omitted, which maintains similarity with Markdown. Blocks are automatically ended if a being sequence of the same BLOCK type or a parent BLOCK type are found. Therefore, SECTION is actually a recursive definition, each with a different number of "#"s used as their begin sequences.

This format allows us to express many data structures in succinct ways.

- The ```something``` sequences delineates block code that is to be printed
- The `sequence` sequence delineates inline code that is to be printed
- The ---sequence--- delineates node data expressed in DML by default. Now we need to define whether we can use this sequence multiple times in a document. And if we can, are the definitions hoisted by default? I think we should be able to define it multiple times, and they must be hoisted, so that we can hoist and merge all DML sequences and make sure the document remains static.

We need to expand on the ability to reference other documents from within a document. The {something} sequence delineates code that is to be executed/interpolated. Unlike React however, the execution engine is not JS! This is because ECMAScript really sucks. Instead, we're going to default to Ruby, and we're going to force this to stay simple, though I'm not exactly sure how. Ideally, we shouldn't be doing any computations inside here. Remember, we're going to stay declarative, and most code will almost always be imperative. We need a way to do simple things, where if the current node has the following data.

For references within content, we should be using simple declarations, where it's all done with {}

We may need to define a new data specification language as well, perhaps DML, a new extension/simplification of YAML. The main things this would support are simple data types (Number, String, Boolean, List, Dictionary), abstract data types (Date, Markex), and references. The syntax for references must be the same syntax used inside the main body of a Markex document. The goal of all of this is to be able to do something like:

```Markex
---
name:       Rumi
born:       Date(30 September 1207)
age:        99
isAmazing:  TRUE
---

Rumi was born on the {born.day.ordinal} day of {born.month} in {born.year}
```

Which gets fleshed out into

```Markex
<Paragraph>Rumi was born on the <Reference>born.day.ordinal</Reference/> day of <Reference>born.month</Reference/> in <Reference>born.year</Reference/></Paragraph>
```

Which gets transformed into AST represented as JSON.

```JSON
[
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "value": "Rumi was born on the "
      },
      {
        "type": "reference",
        "value": "born.day.ordinal"
      },
      {
        "type": "text",
        "value": " day of "
      },
      {
        "type": "reference",
        "value": "born.month"
      },
      {
        "type": "text",
        "value": " in "
      },
      {
        "type": "reference",
        "value": "born.year"
      }
    ]
  }
]
```

Which gets rendered by the HTML renderer as

```Output
<p>Rumi was born on the 30th day of September in 1207</p>
```

So we can generalize the few types of declarations in DML, where everything is essentially an object initialization call

```Markex
---
name: String(Rumi)
born: Date(30 September 1207)
---
```

For nesting, tabs are extremely important! With lists, we can define the simple syntax as the following

## References

We can succinctly handle references to keys within the same document/node and keys outside. For keys within the same node, we simply reference them with

## Explore with data as the primary driver, and content as the secondary
