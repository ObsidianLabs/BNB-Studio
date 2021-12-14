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
    `--datadir=/data --networkid 1000 --mine --nousb --rpc --rpcaddr=0.0.0.0 --rpcport=8575`
  ].join(' ')
}

Network.defaultProps = {
  minerKey: true,
}

export default Network
