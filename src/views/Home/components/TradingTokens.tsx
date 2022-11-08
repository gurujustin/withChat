import { Box, Flex, LinkExternal } from '@pancakeswap/uikit'
import styled from 'styled-components'

const TitleLayout = styled.div`
  display: flex;
  font-size: 16px;
`
const TradingTokens = () => {
  return (
    <Flex>
      <TitleLayout>Trending Tokens</TitleLayout>
    </Flex>
  )
}

export default TradingTokens
