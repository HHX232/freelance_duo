import {developerData} from '@src/contentData/developer_data'
import ContentPageWithSlider from '@shared/ContentPageWithSlider/ContentPageWithSlider'

export const Developer = () => {
  return (
    <div>
      <ContentPageWithSlider data={developerData} title="О застройщике" />
    </div>
  )
}
