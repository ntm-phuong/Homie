import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import { connectDB } from '@/src/lib/mongoose';

export async function GET(req: Request) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully.');

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('room_id');
    console.log('Room ID from URL:', roomId);

    if (!roomId) {
      console.log('Room ID is missing.');
      return NextResponse.json(
        { success: false, message: 'Room ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching room details from database...');
    const room = await Room.findOne({ room_id: roomId }).select(
      'room_id name image address price rating description_room bed_rooms bath_room occupancy_limit status check_in check_out amenities'
    );

    if (!room) {
      console.log('Room not found in database.');
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      );
    }

    console.log('Room details fetched successfully:', room);
    return NextResponse.json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Error fetching room details:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch room details' },
      { status: 500 }
    );
  }
}