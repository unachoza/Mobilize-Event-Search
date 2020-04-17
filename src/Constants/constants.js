export const DEFAULT_PER_PAGE = 'per_page=5'
export const MOBILZE_BASE_URL = `https://api.mobilize.us/v1/events?timeslot_start=gte_now`;
export const DEFAULT_ZIPCODE = 10001


// const observer = useRef()
//   const lastBookElementRef = useCallback(node => {
//     if (loading) return
//     if (observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPageNumber(prevPageNumber => prevPageNumber + 1)
//       }
//     })
//     if (node) observer.current.observe(node)
//   }, [loading, hasMore])

//   function handleSearch(e) {
//     setQuery(e.target.value)
//     setPageNumber(1)
//   }

//   return (
//     <>
//     <input type="text" value={query} onChange={handleSearch}></input>
    
    
//       {books.map((book, index) => {
//         if (books.length === index + 1) {
//           return <div ref={lastBookElementRef} key={book}>{book}</div>
//         } else {
//           return <div key={book}>{book}</div>
//         }
//       })}
    
//       <div>{loading && 'Loading...'}</div>
//       <div>{error && 'Error'}</div>
//     </>
//   )
// }