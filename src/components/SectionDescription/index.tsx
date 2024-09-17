type Props = {
  title: string
  subTitle: string
}

export function SectionDescription({ title, subTitle }: Props) {
  return (
    <div className="text-center">
      <h1 className="font-bold text-3xl text-secondary">{title}</h1>
      <h2 className="text-secondary font-light">{subTitle}</h2>
    </div>
  )
}
