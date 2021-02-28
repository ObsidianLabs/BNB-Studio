import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from '@obsidians/redux'
import Network from '@obsidians/network'
import nodeManager from '@obsidians/node'

nodeManager.generateCommand = ({ name, version }) => {
  const containerName = `${process.env.PROJECT}-${name}-${version}`

  return [
    'docker run -it --rm',
    `--name ${containerName}`,
    `-p 8575:8575`,
    `-v ${process.env.PROJECT}-${name}:/data`,
    `-w /data`,
    `${process.env.DOCKER_IMAGE_NODE}:${version}`,
    `--datadir=/data --rpcaddr=0.0.0.0 --rpcport=8575`
  ].join(' ')
}

class NetworkWithProps extends PureComponent {
  state = {
    active: true
  }

  componentDidMount () {
    this.props.cacheLifecycles.didCache(() => this.setState({ active: false }))
    this.props.cacheLifecycles.didRecover(() => this.setState({ active: true }))
  }

  render () {
    return (
      <Network
        minerKey
        networkId={this.props.network}
        active={this.state.active}
      />
    )
  }
}


export default connect([
  'network',
])(withRouter(NetworkWithProps))
