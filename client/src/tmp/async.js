const mountedRef = useRef(true)

const fetchData = useCallback(async () => {
  try {
    const customer = await getCustomerAsync(custId)
    if (!mountedRef.current) return null;
    setData(customer)
    
  } catch (error) {
    console.log(`error::`, error)
    throw error
  }
}, [])
useEffect(() => {
  fetchData()
  return () => (mountedRef.current = false)
}, [fetchData])
