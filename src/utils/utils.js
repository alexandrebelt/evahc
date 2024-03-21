export function slugify(text){
    return text.toString().toLowerCase()
        .replace(/[àáâãäå]/g, 'a')   // Substitui caracteres acentuados por 'a'
        .replace(/[èéêë]/g, 'e')     // Substitui caracteres e acentuados por 'e'
        .replace(/[ìíîï]/g, 'i')     // Substitui caracteres i acentuados por 'i'
        .replace(/[òóôõö]/g, 'o')    // Substitui caracteres o acentuados por 'o'
        .replace(/[ùúûü]/g, 'u')     // Substitui caracteres u acentuados por 'u'
        .replace(/[ñ]/g, 'n')        // Substitui 'ñ' por 'n'
        .replace(/[ç]/g, 'c')        // Substitui 'ç' por 'c'
        // eslint-disable-next-line
        .replace(/[^\w\-]+/g, '')    // Remove caracteres não alfanuméricos, exceto hífens
        .replace(/\s+/g, '-')        // Substitui espaços em branco por hífens
        // eslint-disable-next-line
        .replace(/\-\-+/g, '-')      // Remove múltiplos hífens por um único hífen
        // eslint-disable-next-line
        .replace(/&#8211;/g, '-') 
        .replace(/^-+/, '')          // Remove hífens no início da string
        .replace(/-+$/, '');         // Remove hífens no final da string
}