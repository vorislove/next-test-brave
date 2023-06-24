## [Ссылка на второе задание](https://next-test-brave.vercel.app)

### Отрефакторенный код из первого задания
`
function func(s, a, b) { 
    if (s.length === 0) -1 ;
    let aIndex = s.lastIndexOf(a); 
    let bIndex = s.lastIndexOf(b); 
    return aIndex !== -1 || bIndex !== -1 ? Math.max(aIndex, bIndex) : -1; 
}
`
