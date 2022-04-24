#!/bin/bash
function run_tests() {
    set_compare=$(python3 -m timeit -s "from match_allergens_test import set_compare" "set_compare($text,$alls)")
    set_disjoint=$(python3 -m timeit -s "from match_allergens_test import set_disjoint" "set_disjoint($text,$alls)")
    if_any=$(python3 -m timeit -s "from match_allergens_test import if_any" "if_any($text,$alls)")
    if_any_lc=$(python3 -m timeit -s "from match_allergens_test import if_any_lc" "if_any_lc($text,$alls)")
}

function print_results() {
    echo "Set Compare: $set_compare"
    echo "Set Disjoint: $set_disjoint"
    echo "If Any: $if_any"
    echo "If Any List Comprehension: $if_any_lc"
    echo
}

text="['patch','ivory','hell','context','confusion','dominate','absent','negligence','advocate','facility','MATCH','confine','area','feature','citizen','surround','chapter','performance','jaw','leash']"
alls="['consist','interest','deer','pathetic','nappy','eyes','tart','face','hate','sorry','elate','MATCH']"

echo "Match at end of alls list"
run_tests
print_results

text="['patch','ivory','hell','context','confusion','dominate','absent','negligence','advocate','facility','MATCH','confine','area','feature','citizen','surround','chapter','fence','performance','jaw','leash']"
alls="['MATCH','consist','interest','deer','pathetic','nappy','eyes','tart','face','hate','sorry','elate']"

echo "Match at start of alls list"
run_tests
print_results

text="['patch','ivory','hell','context','confusion','dominate','absent','negligence','advocate','facility','confine','area','feature','citizen','surround','chapter','performance','jaw','leash','MATCH']"
alls="['consist','interest','deer','pathetic','MATCH','nappy','eyes','tart','face','hate','sorry','elate']"

echo "Match at end of text list"
run_tests
print_results

text="['MATCH','patch','ivory','hell','context','confusion','dominate','absent','negligence','advocate','facility','MATCH','confine','area','feature','citizen','surround','chapter','fence','performance','jaw','leash']"
alls="['consist','interest','deer','pathetic','MATCH','nappy','eyes','tart','face','hate','sorry','elate']"

echo "Match at start of text list"
run_tests
print_results

text="['patch','ivory','hell','context','confusion','dominate','absent','negligence','advocate','facility','MATCH','confine','area','feature','citizen','surround','chapter','fence','performance','jaw','leash']"
alls="['consist','interest','deer','pathetic','NOMATCH','nappy','eyes','tart','face','hate','sorry','elate']"

echo "No matches"
run_tests
print_results