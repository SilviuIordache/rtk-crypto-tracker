function AllocationBar({ weight }) {
  return (
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700/80">
      <div
        className="h-full rounded-full bg-blue-500"
        style={{ width: `${weight}%` }}
      />
    </div>
  )
}

export default AllocationBar
