import React, { PureComponent } from 'react'

import {
  ToolbarButton,
} from '@obsidians/ui-components'

import fileOps from '@obsidians/file-ops'

export default class FaucetButton extends PureComponent {
  claim = async () => {
    let faucetUrl = `https://testnet.binance.org/faucet-smart`
    fileOps.current.openLink(faucetUrl)
  }

  render () {
    if (this.props.network !== 'testnet') {
      return null
    }
    return (
      <ToolbarButton
        id='navbar-faucet'
        size='md'
        icon='fas fa-faucet'
        tooltip='Faucet'
        onClick={this.claim}
      />
    )
  }
}
