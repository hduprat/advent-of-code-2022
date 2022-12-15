export type SubPacket = number | SubPacket[];

export interface PacketPair {
  left: SubPacket[];
  right: SubPacket[];
}
