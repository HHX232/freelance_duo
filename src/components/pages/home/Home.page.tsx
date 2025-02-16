import { Slider } from "@shared/slider/slider"

const HomePage = () => {
  return <div>
    <Slider
      items={[
        '/content/banner.png',
        '/content/banner.png',
      ]}
    >
      <h1>Кронфорт</h1>
      <p>Море меняет все, Море здесь – главная доминанта, наполняющая энергией все пространство вокруг.</p>
    </Slider>
  </div>
}

export default HomePage
