def set_compare(text, alls):
    return len(set(text) & set(alls)) != 0

def set_disjoint(text, alls):
    return not set(text).isdisjoint(set(alls))

def if_any(text, alls):
    if any(x in text for x in alls):
        return True
    else:
        return False

def if_any_lc(text, alls):
    return any(i in text for i in alls)