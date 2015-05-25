# elastic-query-tester

A playground to get familiar with the way elasticsearch handles queries, filters and aggregations.

Each part of the query is represented as block.
The settings for each specific block can be adjusted in the form shown when the block is selected.
Nested blocks can be added by selecting the type in the nesting dropdown, and can be removed by clicking the **x** at the right top side.

The built query can be run by pressing the `Run Query` button. The button will be disabled as long as not all blocks are completed. Incomplete blocks are marked by their red outline (not visible when selected).

Pressing the `Run Query` button will bring up an overlay showing the response, request and a parsed version of the response, using [Shridhad](http://www.jqueryscript.net/plus/search.php?keyword=Shridhad)'s [jjsonviewer](http://www.jqueryscript.net/other/Lightweight-jQuery-Plugin-For-JSON-Beautifier-Viewer-jjsonviewer.html).


Currently present blocks:

**Queries**
- Bool
- Match All
- Nested
- Range
- Term

**Filters**
- And
- Exists
- Missing
- Nested
- Not
- Or
- Range
- Term

**Aggregations**
- Avg
- Filter
- Filters
- Global
- Max
- Min
- Missing
- Nested
- Reverse Nested
- Stats
- Sum
- Terms
- Value Count

This is still an early version, so it might still be buggy. Remarks or PR's welcome.
